import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_need-auth/_admin/admin/products/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_need-auth/_admin/admin/products/"!</div>
}
