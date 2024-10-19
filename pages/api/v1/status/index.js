function status(request, response) {
  response
    .status(200)
    .json({ chave: "Você conseguiu novamente, parabéns de novo" });
}

export default status;
