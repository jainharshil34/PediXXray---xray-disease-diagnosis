import { ApiExample } from "@/components/api-example"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ApiDemoPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">API Integration Demo</h1>
          <p className="text-muted-foreground">Examples of frontend-backend integration patterns</p>
        </div>

        <div className="grid gap-6">
          <ApiExample />

          <Card>
            <CardHeader>
              <CardTitle>Integration Patterns Used</CardTitle>
              <CardDescription>This demo showcases multiple integration approaches</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h4 className="font-medium">Server Actions</h4>
                  <p className="text-sm text-muted-foreground">
                    Form submissions using Next.js server actions for seamless server-side processing
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">REST API Routes</h4>
                  <p className="text-sm text-muted-foreground">
                    Traditional REST endpoints for CRUD operations with proper HTTP methods
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Server Components</h4>
                  <p className="text-sm text-muted-foreground">
                    React Server Components for server-side data fetching and rendering
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Client Components</h4>
                  <p className="text-sm text-muted-foreground">
                    Interactive client-side components with state management and API calls
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
