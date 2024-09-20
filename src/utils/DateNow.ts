const data = new Date();
const dia = data.getDate();
const mes = data.getMonth();
const ano = data.getFullYear();
const dias = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
const meses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']
const diaSemana = dias[data.getDay()];
const mesAno = meses[mes];

export const HeaderDataInfo = `${diaSemana}, ${dia} de ${mesAno} de ${ano}`;