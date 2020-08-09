import React, { useState, FormEvent } from 'react'
import { useHistory } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import PageHeader from '../../components/PageHeader'
import Input from '../../components/Input'
import Textarea from '../../components/Textarea'
import Select from '../../components/Select'

import warningIcon from '../../assets/images/icons/warning.svg'
import subjectOptions from '../../constants/subjects'
import weekDayOptions from '../../constants/weekDays'
import api from '../../services/api'
import { errorAlert, successAlert } from '../../utils/alerts'

import './styles.css'

interface ScheduleItem {
  week_day: number
  from: string
  to: string
}

const TeacherForm: React.FC = () => {
  const { push: redirect } = useHistory()

  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [bio, setBio] = useState('')

  const [subject, setSubject] = useState('')
  const [cost, setCost] = useState('')

  const emptyScheduleItem: ScheduleItem = { week_day: 0, from: '', to: '' }
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([emptyScheduleItem])

  const addNewScheduleItem = () => setScheduleItems([...scheduleItems, emptyScheduleItem])

  const setScheduleItemValue = (position: number, field: string, value: string) => {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) return { ...scheduleItem, [field]: value }
      return scheduleItem
    })
    setScheduleItems(updatedScheduleItems)
  }

  const handleCreateClass = async (e: FormEvent) => {
    e.preventDefault()

    try {
      await api.post('/classes', {
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost: Number(cost),
        schedule: scheduleItems
      })
      await successAlert('Cadastro efetuado!')
      redirect('/')
    } catch (err) {
      const { message } = err.response.data
      errorAlert(message)
    }
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo é preencher esse formulário de inscrição"
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>
            <Input name="name" label="Nome completo" value={name} onChange={(e) => setName(e.target.value)} required />
            <Input name="avatar" label="Avatar" value={avatar} onChange={(e) => setAvatar(e.target.value)} required />
            <Input
              name="whatsapp"
              label="Whatsapp"
              type="tel"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              required
            />
            <Textarea name="bio" label="Biografia" value={bio} onChange={(e) => setBio(e.target.value)} required />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>
            <Select
              name="subject"
              label="Matéria"
              options={subjectOptions}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
            <Input
              name="cost"
              label="Custo da sua hora por aula"
              type="number"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              required
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button className="schedule-button" type="button" onClick={addNewScheduleItem}>
                + Novo horário
              </button>
            </legend>

            {scheduleItems.map(({ week_day, from, to }, index) => (
              <div key={uuid()} className="schedule-item">
                <Select
                  name="week_day"
                  label="Dia da semana"
                  options={weekDayOptions}
                  value={week_day}
                  onChange={(e) => setScheduleItemValue(index, 'week_day', e.target.value)}
                  required
                />
                <Input
                  name="from"
                  label="Das"
                  type="time"
                  value={from}
                  onChange={(e) => setScheduleItemValue(index, 'from', e.target.value)}
                  required
                />
                <Input
                  name="to"
                  label="Até"
                  type="time"
                  value={to}
                  onChange={(e) => setScheduleItemValue(index, 'to', e.target.value)}
                  required
                />
              </div>
            ))}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante! <br />
              Preencha todos os dados
            </p>
            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  )
}

export default TeacherForm
