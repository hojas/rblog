import Header from './Header'

export default ({ user, children }) => (
  <div>
    <Header user={user} />
    <div className="container">{children}</div>
  </div>
)
