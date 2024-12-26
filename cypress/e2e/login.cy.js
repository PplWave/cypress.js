describe('Проверка авторизации', function () {

    it('Верный логин и верный пароль', function () {
         cy.visit('https://login.qa.studio/'); // зашел на сайт
         cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // проверяю цвет кнопки восстановить пароль
         cy.get('#mail').type('german@dolnikov.ru') // вввел верный логин
         cy.get('#pass').type('iLoveqastudio1') // ввел верный пароль
         cy.get('#loginButton').click(); // нажал на кнопку войти
         cy.wait(5000);
         cy.get('#messageHeader').contains('Авторизация прошла успешно'); // проверяю, что после авторизации вижу текст
         cy.get('#messageHeader').should('be.visible') // Текст виден пользователю
         cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // есть крестик и он виден для пользователя
     })

     it('Проверкав восстановления пароля', function () {
        cy.visit('https://login.qa.studio/'); // зашли на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // проверяю цвет кнопки восстановить пароль
        cy.get('#forgotEmailButton').click(); // нажал на кнопку восстановить пароль
        cy.get('#mailForgot').type('german@dolnikov.ru') // ввел  почту для востановления
        cy.get('#restoreEmailButton').click(); // нажал отправить код

        cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail'); // проверяю на совпадение текст
        cy.get('#messageHeader').should('be.visible') // Текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // есть крестик и он виден для пользователя
    })

     it('ВВерный логин и неверный пароль', function () {
        cy.visit('https://login.qa.studio/'); // зашел на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // проверяю цвет кнопки восстановить пароль
        cy.get('#mail').type('german@dolnikov.ru') // ввел логин
        cy.get('#pass').type('iLoveqastudio7') // ввел неверный пароль
        cy.get('#loginButton').click(); // нажал на кнопку войти

        cy.get('#messageHeader').contains('Такого логина или пароля нет'); // проверяю, что после авторизации вижу текст
        cy.get('#messageHeader').should('be.visible') // Текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // есть крестик и он виден для пользователя
    })

    it('Проверка валидации логина', function () {
        cy.visit('https://login.qa.studio/'); // зашли на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // проверяю цвет кнопки восстановить пароль
        cy.get('#mail').type('germans@dolnikov.ru') // ввел  неправильный логин
        cy.get('#pass').type('iLoveqastudio1') // ввел верный пароль
        cy.get('#loginButton').click(); // нажал на кнопку войти

        cy.get('#messageHeader').contains('Такого логина или пароля нет'); // проверяю, что после авторизации вижу текст
        cy.get('#messageHeader').should('be.visible') // Текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // есть крестик и он виден для пользователя
    })

    it('Проверка валидации логина на предмет наличия @', function () {
        cy.visit('https://login.qa.studio/'); // зашли на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // проверяю цвет кнопки восстановить пароль
        cy.get('#mail').type('germandolnikov.ru') // ввел логин без @
        cy.get('#pass').type('iLoveqastudio1') // ввел верный пароль
        cy.get('#loginButton').click(); // нажал на кнопку войти

        cy.get('#messageHeader').contains('Нужно исправить проблему валидации'); // проверяю, что после авторизации вижу текст
        cy.get('#messageHeader').should('be.visible') // Текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // есть крестик и он виден для пользователя
    })

    it('Верный логин и верный пароль, строчные буквы', function () {
        cy.visit('https://login.qa.studio/'); // зашел на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // проверяю цвет кнопки восстановить пароль
        cy.get('#mail').type('GerMaN@dolnikov.ru') // вввел верный логин
        cy.get('#pass').type('iLoveqastudio1') // ввел верный пароль
        cy.get('#loginButton').click(); // нажал на кнопку войти
        cy.get('#messageHeader').contains('Авторизация прошла успешно'); // проверяю, что после авторизации вижу текст
        cy.get('#messageHeader').should('be.visible') // Текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // есть крестик и он виден для пользователя
    })
 })
 