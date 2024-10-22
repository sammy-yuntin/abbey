import Contact from "../models/contact";

class ContactRepo {
  async add(payload) {
    return await Contact.create(payload);
  }

  async remove(id) {
    return await Contact.destroy({ where: { id } });
  }

  async edit(id, payload) {
    return await Contact.update(payload, { where: { id } });
  }
  async view(id) {
    return await Contact.findByPk(id);
  }

  async findContacts(query) {
    return await Contact.findAndCountAll(query);
  }

  async findByPhone(phone: string): Promise<object> {
    return await Contact.findOne({ where: { phone } });
  }
}

export default new ContactRepo();
