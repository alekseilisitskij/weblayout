import {
  validationCardNumber,
  validationEmail,
  validationCardCvv,
  validationExpiryDate,
} from "./validate.js";
import { formCard } from "./main.js";

describe("Проверка валидации кредитной карты", () => {
  it("Проверка номера карты отрабатывает корректно", () => {
    expect(validationCardNumber("1111 1111 1111 1111")).toBe(true);
  });

  it("Проверка номера карты с неправильным номером отрабатывает корректно", () => {
    expect(validationCardNumber("строка")).toBe(false);
    expect(validationCardNumber("string")).toBe(false);
    expect(validationCardNumber(",.")).toBe(false); // проверка на знаки препинания
    expect(validationCardNumber("1111111111111111")).toBe(false); // номер карты без пробелов
    expect(validationCardNumber("1111 1111 1111 111_")).toBe(false); // номер карты заполнен не до конца
    expect(validationCardNumber("1111 1111 1111 1111 1111")).toBe(false); // больше цифр
    expect(validationCardNumber("1111 1111 1111 111111")).toBe(false); // больше цифр
  });

  it("Проверка email отрабатывает корректно", () => {
    expect(validationEmail("email@email.com")).toBe(true);
  });

  it("Проверка CVV отрабатывает корректно", () => {
    expect(validationCardCvv("123")).toBe(true);
    expect(validationCardCvv("1234")).toBe(true);
  });

  it("Проверка CVV с неправильными данными отрабатывает корректно", () => {
    expect(validationCardCvv("12")).toBe(false);
    expect(validationCardCvv("12345")).toBe(false);
    expect(validationCardCvv("abc")).toBe(false);
    expect(validationCardCvv("абв")).toBe(false);
    expect(validationCardCvv("...")).toBe(false);
    expect(validationCardCvv(",,,")).toBe(false);
  });

  it("Проверка mm/yy отрабатывает корректно", () => {
    expect(validationExpiryDate("11/25")).toBe(true);
  });

  it("Функция создания DOM-дерева должна вернуть DOM-элемент", () => {
    formCard();

    expect(document.body.querySelector("#expirationdate")).toBeDefined();
    expect(document.body.querySelector("#cardnumber")).toBeDefined();
    expect(document.body.querySelector("#securitycode")).toBeDefined();
    expect(document.body.querySelector("#email")).toBeDefined();
  });
});
