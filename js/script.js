'use strict';

const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};

document.addEventListener("DOMContentLoaded", () => {
    const adv = document.querySelectorAll('.promo__adv img'),
        poster = document.querySelector('.promo__bg'),
        genre = poster.querySelector('.promo__genre'),
        moveList = document.querySelector('.promo__interactive-list'),
        formAdd = document.querySelector('.add'),
        addInput = formAdd.querySelector('.adding__input'),
        checkbox = formAdd.querySelector('[type = "checkbox"]');


    const makeChanges = () => {
        genre.textContent = "Драма";
        poster.style.backgroundImage = 'url("img/bg.jpg")';
    };


    const SortArr = (arr) => {
        arr.sort();
    };

    const deleteAdv = (arr) => {
        arr.forEach(item => {
            item.remove();
        });
    };

    function CreateMoveList(films, parent) {
        parent.innerHTML = ""; // очищаем moveList
        SortArr(films);

        films.forEach((film, i) => {
            parent.innerHTML += `
                <li class="promo__interactive-item">${i + 1} ${film}
                    <div class="delete"></div>
                </li>
            `;
        });

        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click',() => {
                btn.parentElement.remove();
                movieDB.movies.splice(i,1);
                CreateMoveList(movieDB.movies, moveList);
            });
        });
    }



    CreateMoveList(movieDB.movies, moveList);

    document.addEventListener('submit', (event) => {
        event.preventDefault(); // предотвращаем стандартные действия браузера

        let newFilm = addInput.value;
        const favorite = checkbox.checked;

        if (newFilm) {
            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 22)}...`;
            }

            if (favorite) {
                console.log("Добавляем любимый фильм");
            }


            movieDB.movies.push(newFilm);
            SortArr(movieDB.movies);
            CreateMoveList(movieDB.movies, moveList);

            event.target.reset();
        }
    });

    deleteAdv(adv);
    makeChanges();

});