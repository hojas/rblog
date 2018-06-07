import Header from './Header'

export default ({ children }) => (
  <div>
    <Header />
    <div className="container">{children}</div>
  </div>
)
