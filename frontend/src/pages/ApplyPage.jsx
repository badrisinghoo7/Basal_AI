import { useState } from 'react'
import { submitApplication } from '../services/api'
import './ApplyPage.css'
import socket from '../socket'

function ApplyPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    jobTitle: ''
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const jobTitleOptions = [
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'DevOps Engineer',
    'Data Scientist',
    'Product Manager',
    'UI/UX Designer',
    'QA Engineer'
  ]

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.jobTitle) {
      setError('Please fill in all fields')
      return
    }

    setLoading(true)
    setError('')

    try {
      await submitApplication(formData)
      socket.emit('join-recruiter-room',  (formData) )
      setSubmitted(true)
      setFormData({ name: '', email: '', jobTitle: '' })
    } catch (err) {
      setError('Failed to submit application. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleNewApplication = () => {
    setSubmitted(false)
  }

  if (submitted) {
    return (
      <div className="apply-page">
        <div className="success-card">
          <div className="success-icon">✓</div>
          <h2>Application Submitted Successfully!</h2>
          <p>Thank you for your interest. Our recruitment team will review your application and get back to you soon.</p>
          <button 
            onClick={handleNewApplication}
            className="btn btn-primary"
          >
            Submit Another Application
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="apply-page">
      <div className="apply-card">
        <h2>Job Interview Application</h2>
        <p>Please fill out the form to schedule your interview</p>
        
        <form onSubmit={handleSubmit} className="apply-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Full Name"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="jobTitle">Job Title</label>
            <select
              id="jobTitle"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleInputChange}
              disabled={loading}
            >
              <option value="">Job title</option>
              {jobTitleOptions.map(job => (
                <option key={job} value={job}>{job}</option>
              ))}
            </select>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          <div className='button-action'>


          <button 
            type="submit" 
            className="btn btn-primary btn-submit"
            disabled={loading}
            >
            {loading ? 'Submitting...' : 'Submit Application'}
          </button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default ApplyPage