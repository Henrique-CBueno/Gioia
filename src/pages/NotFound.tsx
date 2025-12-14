import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section>
      <h2>Not Found</h2>
      <p>The page you’re looking for doesn’t exist.</p>
      <p>
        <Link to="/">Go back home</Link>
      </p>
    </section>
  )
}
