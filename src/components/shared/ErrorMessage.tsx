import { AlertTriangle } from "lucide-react"

interface ErrorMessageProps {
  title?: string
  description?: string
  reset?: () => void
}

export function ErrorMessage({
  title = "Something went wrong",
  description = "An error occurred while loading this content. Please try again.",
  reset,
}: ErrorMessageProps) {
  return (
    <div className="rounded-lg border border-dashed p-10 text-center">
      <div className="flex justify-center mb-4">
        <AlertTriangle className="size-8 text-destructive" />
      </div>

      <h2 className="text-lg font-semibold">{title}</h2>

      <p className="text-sm text-muted-foreground mt-2">{description}</p>

      {reset && (
        <button
          onClick={reset}
          className="mt-6 text-sm underline underline-offset-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          Try again
        </button>
      )}
    </div>
  )
}