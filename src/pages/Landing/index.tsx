import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import logoImg from '../../assets/images/logo.svg'
import landingImg from '../../assets/images/landing.svg'
import studyIcon from '../../assets/images/icons/study.svg'
import giveClassesIcon from '../../assets/images/icons/give-classes.svg'
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg'
import api from '../../services/api'

import './styles.css'

const Landing: React.FC = () => {
  const [totalConnections, setTotalConnections] = useState(0)
  const [loadingTotalConnections, setLoadingTotalConnections] = useState(true)

  useEffect(() => {
    async function loadTotalConnections() {
      try {
        const {
          data: { total }
        } = await api.get('/connections')
        setTotalConnections(total)
      } catch (err) {
        console.error(err)
      }
    }
    loadTotalConnections()
    setLoadingTotalConnections(false)
  }, [])

  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        <div className="logo-container">
          <img src={logoImg} alt="Proffy" />
          <h2>Sua plataforma de estudos online.</h2>
        </div>

        <img src={landingImg} alt="Plataforma de estudos" className="hero-image" />

        <div className="buttons-container">
          <Link to="/study" className="study">
            <img src={studyIcon} alt="Ilustração de um livro" />
            Estudar
          </Link>

          <Link to="/give-classes" className="give-classes">
            <img src={giveClassesIcon} alt="Ilustração de um monitor" />
            Dar aulas
          </Link>
        </div>

        {!loadingTotalConnections && (
          <span className="total-connections">
            Total de {totalConnections} conexões já realizadas <img src={purpleHeartIcon} alt="Coração roxo" />
          </span>
        )}
      </div>
    </div>
  )
}

export default Landing