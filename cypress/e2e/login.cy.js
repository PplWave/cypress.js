import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json"
import * as result_page from "../locators/result_page.json"
import * as recovery_page from "../locators/recovery_password_page.json"

describe('Проверка авторизации', function () {

    beforeEach('Начало теста', function () {
        cy.visit('/');
        cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)');
          });

          afterEach('Конец теста', function () {
            cy.get(result_page.close).should('be.visible'); // есть крестик и он виден для пользователя
           });


    it('Верный логин и верный пароль', function () {
         cy.get(main_page.email).type(data.login) // вввел верный логин
         cy.get(main_page.password).type(data.password) // ввел верный пароль
         cy.get(main_page.login_button).click(); // нажал на кнопку войти
         cy.wait(2000);
         cy.get(result_page.title).contains('Авторизация прошла успешно'); // проверяю, что после авторизации вижу текст
         cy.get(result_page.title).should('be.visible') // Текст виден пользователю
     })

     it('Проверкав восстановления пароля', function () {
        cy.get(main_page.fogot_pass_btn).click(); // нажал на кнопку восстановить пароль
        cy.get(recovery_page.email).type('german@dolnikov.ru') // ввел  почту для востановления
        cy.get(recovery_page.send_button).click(); // нажал отправить код

        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail'); // проверяю на совпадение текст
        cy.get(result_page.title).should('be.visible') // Текст виден пользователю
    })

     it('ВВерный логин и неверный пароль', function () {
        cy.get(main_page.email).type(data.login) // ввел логин
        cy.get(main_page.password).type('iLoveqastudio7') // ввел неверный пароль
        cy.get(main_page.login_button).click(); // нажал на кнопку войти

        cy.get(result_page.title).contains('Такого логина или пароля нет'); // проверяю, что после авторизации вижу текст
        cy.get(result_page.title).should('be.visible') // Текст виден пользователю
    })

    it('Проверка валидации логина', function () {
        cy.get(main_page.email).type('germans@dolnikov.ru') // ввел  неправильный логин
        cy.get(main_page.password).type(data.password) // ввел верный пароль
        cy.get(main_page.login_button).click(); // нажал на кнопку войти

        cy.get(result_page.title).contains('Такого логина или пароля нет'); // проверяю, что после авторизации вижу текст
        cy.get(result_page.title).should('be.visible') // Текст виден пользователю
    })

    it('Проверка валидации логина на предмет наличия @', function () {
        cy.get(main_page.email).type('germandolnikov.ru') // ввел логин без @
        cy.get(main_page.password).type(data.password) // ввел верный пароль
        cy.get(main_page.login_button).click(); // нажал на кнопку войти

        cy.get(result_page.title).contains('Нужно исправить проблему валидации'); // проверяю, что после авторизации вижу текст
        cy.get(result_page.title).should('be.visible') // Текст виден пользователю
    })

    it('Верный логин и верный пароль, строчные буквы', function () {
        cy.get(main_page.email).type('GerMaN@dolnikov.ru') // вввел верный логин
        cy.get(main_page.password).type('iLoveqastudio1') // ввел верный пароль
        cy.get(main_page.login_button).click(); // нажал на кнопку войти
        cy.get(result_page.title).contains('Авторизация прошла успешно'); // проверяю, что после авторизации вижу текст
        cy.get(result_page.title).should('be.visible') // Текст виден пользователю
    })
 })
 