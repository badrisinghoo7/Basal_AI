import { useState, useEffect } from 'react'
import { getApplications, updateApplicationStatus } from '../services/api'
import './RecruiterPage.css'
import socket from '../socket'

function RecruiterPage() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchApplications()
  }, [applications])

  const fetchApplications = async () => {
    try {
      const data = await getApplications()
      setApplications(data.data)
    } catch (err) {
      setError('Failed to load applications')
    } finally {
      setLoading(false)
    }
  }
  // console.log(applications)
  const handleAccept = async (id) => {
    try {
      socket.emit('join-recruiter-room',{id})
      await updateApplicationStatus(id, 'accepted')
      setApplications(prev =>
        prev.map(app =>
          app._id === id ? { ...app, status: 'accepted' } : app
        )
      )
    } catch (err) {
      setError('Failed to update application status')
    }
  }

  const filteredApplications = applications.filter(app => {
    if (filter === 'all') return true
    return app.status === filter
  })

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString()
  }

  const getStatusBadge = (status) => {
    const className = status === 'accepted' ? 'status-badge accepted' : 'status-badge pending'
    return <span className={className}>{status}</span>
  }

  if (loading) {
    return (
      <div className="recruiter-page">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading applications...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="recruiter-page">
      <div className="page-header">
        <div className="header-content">
          <h1>Recruiter Dashboard</h1>
          <div className="connection-status">
            <span className={`status-indicator ${socket.connected ? 'connected' : 'disconnected'}`}></span>
            {socket.connected ? 'connected' : 'Connection lost'}
          </div>
        </div>
        
        <div className="filters">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({applications.length})
          </button>
          <button
            className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            Pending ({applications.filter(app => app.status === 'pending').length})
          </button>
          <button
            className={`filter-btn ${filter === 'accepted' ? 'active' : ''}`}
            onClick={() => setFilter('accepted')}
          >
            Accepted ({applications.filter(app => app.status === 'accepted').length})
          </button>
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {filteredApplications.length === 0 ? (
        <div className="empty-state">
          <h3>No applications found</h3>
          <p>
            {filter === 'all' 
              ? 'No applications have been submitted yet.' 
              : `No ${filter} applications found.`
            }
          </p>
        </div>
      ) : (
        <div className="applications-container">
          <div className="applications-table">
            <div className="table-header">
              <div className="header-cell">Name</div>
              <div className="header-cell">Email</div>
              <div className="header-cell">Job Title</div>
              <div className="header-cell">Submitted</div>
              <div className="header-cell">Action</div>
            </div>
            
            {filteredApplications.map((application) => (
              <div key={application._id} className="table-row">
                <div className="table-cell">
                  <strong>{application.name}</strong>
                </div>
                <div className="table-cell">
                  <a href={`mailto:${application.email}`} className="email-link">
                    {application.email}
                  </a>
                </div>
                <div className="table-cell">
                  <span className="job-title">{application.jobTitle}</span>
                </div>
                <div className="table-cell">
                  <span className="date">{formatDate(application.createdAt)}</span>
                </div>
                <div className="table-cell">
                  {application.status === 'pending' ? (
                    <button
                      onClick={() => handleAccept(application._id)}
                      className="btn btn-accept"
                    >
                      Accept
                    </button>
                  ) : (
                    <span className="accepted-text">Accepted</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default RecruiterPage