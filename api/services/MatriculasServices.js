const Services = require('./Services');
const database = require('../models');
const { Sequelize } = require('../models');

class MatriculasServices extends Services {
  constructor() {
    super('Matriculas');
  }
  //Métodos especificos do controlador de Matriculas
  async pegaUmRegistro(estudanteId, matriculaId) {
    return database[this.nomeDoModelo].findOne({
      where: { id: Number(matriculaId), estudante_id: Number(estudanteId) }
    })
  }

  async atualizaRegistro(dadosAtualizados, estudanteId, matriculaId) {
    return database[this.nomeDoModelo].update(dadosAtualizados, {
      where: {
        id: Number(matriculaId),
        estudante_id: Number(estudanteId)
      }
    })
  }

  async restauraRegistro(estudanteId, matriculaId) {
    return database[this.nomeDoModelo].restore({
      where: {
        id: Number(matriculaId),
        estudante_id: Number(estudanteId)
      }
    })
  }
}

module.exports = MatriculasServices;
