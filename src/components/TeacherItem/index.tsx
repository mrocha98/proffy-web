import React from 'react'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import './styles.css'

const TeacherItem: React.FC = () => {
  return (
    <article className="teacher-item">
      <header>
        <img src="https://pbs.twimg.com/profile_images/1120304320564559872/LLNWj7Vf_400x400.jpg" alt="Fausto Silva" />
        <div>
          <strong>Fausto Silva</strong>
          <span>Química</span>
        </div>
      </header>

      <p>
        Entusiasta das melhores tecnologias de química avançada.
        <br />
        <br />
        Apaixonado por explodir churrasqueiras e por mudar a vida das pessoas através de pegadinhas. Mais de 20.000
        pessoas já passaram por uma das minhas explosões.
      </p>

      <footer>
        <p>
          Preço/hora <strong>R$ 80,00</strong>
        </p>
        <button type="button">
          <img src={whatsappIcon} alt="Logo do Whatsapp" />
          Entrar em contato
        </button>
      </footer>
    </article>
  )
}

export default TeacherItem
