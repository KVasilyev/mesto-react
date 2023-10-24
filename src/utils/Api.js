class Api {
    constructor(options) {  
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }
    _checkResponse(result) {
        if (result.ok) {
            return result.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${result.status}`);
    }

    // Получаем информацию обо мне
    async getMyInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
        .then(this._checkResponse)
    }  
    
    // Устанавливаем информацию о себе на сервер
    async setMyInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers
            ,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
        .then(this._checkResponse) 
    }

    //Меняем аватар
    async setMyAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers
            ,
            body: JSON.stringify({
                avatar: data.avatar,
            })
        })
        .then(this._checkResponse)
    }


    // Получаем все карточки с сервера
    async getCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
        .then(this._checkResponse)
    }
    // Загружаем карточку на сервер
    async addCards({name, link}) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
        .then(this._checkResponse)
    }
    // Удаление карточки с сервера
    async deleteCards(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers,
        })
        .then(this._checkResponse)
    }

    //Ставим лайк
    async setLike(card) {
        return fetch(`${this._baseUrl}/cards/${card}/likes`, {
            method: 'PUT',
            headers: this._headers
        })
        .then(this._checkResponse)
    }
    //Удаляем лайк
    async unsetLike(card) {
        return fetch(`${this._baseUrl}/cards/${card}/likes`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._checkResponse)
    }  
}

// API 
const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-77',
    headers: {
      authorization: '9204a9cc-6a48-46ae-b1bd-54502917751b',
      'Content-Type': 'application/json'
    }
});

export default api;