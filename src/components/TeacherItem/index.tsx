import React from 'react'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'
import api from '../../services/api'
import { errorAlert } from '../../utils/alerts'

import './styles.css'

export interface TeacherProps {
  id: number
  avatar: string
  bio: string
  cost: number
  name: string
  subject: string
  whatsapp: string
}

const TeacherItem: React.FC<TeacherProps> = ({ id, avatar, bio, cost, name, subject, whatsapp }) => {
  const whatsappLink = `https://wa.me/${whatsapp}`

  const createNewConnection = async () => {
    try {
      await api.post('/connections', {
        user_id: id
      })
    } catch {
      errorAlert('Erro ao gerar nova conexão')
    }
  }

  return (
    <article className="teacher-item">
      <header>
        <img src={avatar} alt={`foto de ${name}`} />
        <div>
          <strong>{name}</strong>
          <span>{subject}</span>
        </div>
      </header>

      <p>{bio}</p>

      <footer>
        <p>
          Preço/hora <strong>{cost}</strong>
        </p>
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" onClick={createNewConnection}>
          <img src={whatsappIcon} alt="Logo do Whatsapp" />
          Entrar em contato
        </a>
      </footer>
    </article>
  )
}

export default TeacherItem
