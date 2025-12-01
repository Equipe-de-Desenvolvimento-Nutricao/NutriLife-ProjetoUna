// Armazena dados do nutricionista logado
let nutricionistaLogado = {
  id: 0,
  nome: '',
  email: ''
};

export const setNutricionista = (id: number, nome: string, email: string) => {
  nutricionistaLogado = { id, nome, email };
  console.log('✅ Nutricionista salvo:', nutricionistaLogado);
};

export const getNutricionistaId = () => {
  return nutricionistaLogado.id;
};

export const getNutricionistaNome = () => {
  return nutricionistaLogado.nome;
};

export const limparNutricionista = () => {
  nutricionistaLogado = { id: 0, nome: '', email: '' };
};