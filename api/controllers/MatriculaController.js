const { MatriculasServices } = require('../services');
const matriculaServices = new MatriculasServices();
const Sequelize = require('sequelize')

class MatriculaController {
  static async pegaUmaMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params;
    try {
      const umaMatricula = await matriculaServices.pegaUmRegistro(estudanteId, matriculaId);
      return res.status(200).json(umaMatricula);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async criaMatricula(req, res) {
    const { estudanteId } = req.params;
    const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) };
    try {
      const novaMatriculaCriada = await matriculaServices.criaRegistro(novaMatricula);
      return res.status(200).json(novaMatriculaCriada);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async atualizaMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params;
    const novasInfos = req.body;
    try {
      await matriculaServices.atualizaRegistro(novasInfos, estudanteId, matriculaId);
      const matriculaAtualizada = await matriculaServices.pegaUmRegistro(estudanteId, matriculaId);
      return res.status(200).json(matriculaAtualizada);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async apagaMatricula(req, res) {
    const { matriculaId } = req.params;
    try {
      await matriculaServices.apagaRegistro(matriculaId)
      return res
        .status(200)
        .json({ mensagem: `Matricula Id ${matriculaId} foi deletado` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async restauraMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params;
    try {
      await matriculaServices.restauraRegistro(estudanteId, matriculaId);
      return res
        .status(200)
        .json({ mensagem: `id ${matriculaId} restaurado com sucesso` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async pegaMatriculasPorTurma(req, res) {
    const { turmaId } = req.params;
    try {
      const todasAsMatriculas = await matriculaServices
        .encontraEContaRegistros(
          { turma_id: Number(turmaId), status: 'confirmado' },
          {limit: 20, order: [['estudante_id', 'DESC']] })
      return res.status(200).json(todasAsMatriculas);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async pegaTurmasLotadas(req, res) {
    const lotacaoTurma = 2;
    try {
      const turmasLotadas = await matriculaServices
        .encontraEContaRegistros({ status: 'confirmado' },
        {
          attributes: ['turma_id'],
          group: ['turma_id'],
          having: Sequelize.literal(`count(tuurma_id) >= ${lotacaoTurma}`)
        })
      return res.status(200).json(turmasLotadas.count);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = MatriculaController;