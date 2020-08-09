import React, { useState, FormEvent } from 'react'

import PageHeader from '../../components/PageHeader'
import TeacherItem, { TeacherProps } from '../../components/TeacherItem'
import Input from '../../components/Input'
import Select from '../../components/Select'
import subjectOptions from '../../constants/subjects'
import weekDayOptions from '../../constants/weekDays'
import api from '../../services/api'
import { errorAlert } from '../../utils/alerts'

import './styles.css'

const TeacherList: React.FC = () => {
  const [teachers, setTeachers] = useState<TeacherProps[]>([])
  const [subject, setSubject] = useState('')
  const [weekDay, setWeekDay] = useState('')
  const [time, setTime] = useState('')

  const searchTeachers = async (e: FormEvent) => {
    e.preventDefault()

    try {
      const { data } = await api.get('/classes', {
        params: {
          subject,
          week_day: weekDay,
          time
        }
      })
      setTeachers(data)
    } catch (err) {
      const { message } = err.response.data
      errorAlert(message)
    }
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os profs disponíveis.">
        <form id="search-teachers" onSubmit={searchTeachers}>
          <Select
            name="subject"
            label="Matéria"
            options={subjectOptions}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <Select
            name="week_day"
            label="Dia da semana"
            options={weekDayOptions}
            value={weekDay}
            onChange={(e) => setWeekDay(e.target.value)}
          />
          <Input name="time" label="Hora" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          <button type="submit">Buscar</button>
        </form>
      </PageHeader>

      <main>
        {teachers.map(({ avatar, subject, name, cost, bio, id, whatsapp }) => (
          <TeacherItem
            key={id}
            id={id}
            avatar={avatar}
            name={name}
            subject={subject}
            cost={cost}
            bio={bio}
            whatsapp={whatsapp}
          />
        ))}
      </main>
    </div>
  )
}

export default TeacherList
