import "./about.css";

export function About() {
    return (<section class="about__section">
        <h1>О проекте</h1>
        <p>Я Иван Смирнов, Frontend-разработчик и Linux enjoyer!</p>
        <p>Данный блог является моим пет-проектом, где я пробую различные технологии и инструменты веб-разработки. Если у вас есть какие то пожелания или вопросы по проекту, можете их задать в обсуждениях к проекту на Github.</p>
        <p>Используемый технологический стек:</p>
        <ul>
            <li>Фронтенд: 
                <ul>
                    <li>TypeScript как язык программирования</li>
                    <li>pnpm для сборки проекта</li>
                    <li>Preact как фреймворк</li>
                </ul>
            </li>
            <li>
                Бэкенд:
                <ul>
                    <li>Rust как основной язык программирования</li>
                    <li>Rocket.rs как HTTP-сервер</li>
                    <li>Diesel.rs - ORM</li>
                    <li>PostgreSQL для хранения данных</li>
                </ul>
            </li>
        </ul>
    </section>);
}