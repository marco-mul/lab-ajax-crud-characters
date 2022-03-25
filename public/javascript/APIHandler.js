const axios = require('axios').default;

class APIHandler {
  constructor (baseUrl) {
    this.BASE_URL = baseUrl;
  }

  async getFullList() {
    try {
      const response = await axios.get(`${this.BASE_URL}/characters`);
      return response.data;
    } catch (error) {
      console.log(error);
      return "Character not found";
    }
  }

  async getOneRegister(id) {
    try {
      const response = await axios.get(`${this.BASE_URL}/characters/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return "Character not found";
    }
  }

  async createOneRegister(characterInfo) {
    const response = await axios.post(`${this.BASE_URL}/characters/`, characterInfo);
    return response.data;
  }

  async updateOneRegister(id, characterInfo) {
    try {
      const response = await axios.patch(`${this.BASE_URL}/characters/${id}`, characterInfo);
      return response.data;
    } catch (error) {
      console.log(error);
      return "Character not found";
    }
  }

  async deleteOneRegister(id) {
    try {
      const response = await axios.delete(`${this.BASE_URL}/characters/${id}`);
      return "Character successfully deleted";
    } catch (error) {
      console.log(error);
      return "Character not found";
    }
  }
}