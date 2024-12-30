import { Repository } from 'typeorm';
import {Base} from './entity'

export class BaseService {
  constructor(protected repository: Repository<Base>) {}

  handleFind(query, condition = { active: true }) {
    query.where(condition);
    return query;
  }

  handleSelect() {
    return this.repository.createQueryBuilder();
  }

  handleOrder(query) {
    return query.orderBy(['id asc']);
  }

  getList(condition: any = {active: true}) {
    let query = this.handleSelect();
    query = this.handleFind(query, condition);
    return query.getRawMany();
  }

  async create(data) {
    const result = await this.repository
      .createQueryBuilder()
      .insert()
      .values(data)
      .execute()
    return result.identifiers[0];
  }

  updateOne(id, data) {
    return this.repository
      .createQueryBuilder()
      .update()
      .set(data)
      .where("id = :id", { id })
      .execute();
  }

  softDelete(id) {
    return this.updateOne(id, {active: false})
  }

  generateSecureString(): string {
    const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
    const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    const allChars = lowerCase + upperCase + numbers + specialChars;

    let result = '';
    result += lowerCase[Math.floor(Math.random() * lowerCase.length)];
    result += upperCase[Math.floor(Math.random() * upperCase.length)];
    result += numbers[Math.floor(Math.random() * numbers.length)];
    result += specialChars[Math.floor(Math.random() * specialChars.length)];

    for (let i = result.length; i < 10; i++) {
      result += allChars[Math.floor(Math.random() * allChars.length)];
    }

    result = result.split('').sort(() => Math.random() - 0.5).join('');
    return result;
  }
}











