export default function hubPage(app) {
  const data = {
    "test": "1234567."
  }
  app.get("/hubpage", async(request, response) => {
    return response.send(data);
  });
};