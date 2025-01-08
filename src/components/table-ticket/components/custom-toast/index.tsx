import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export function ticketCustomToast(
  ticketId: string,
  onConfirm: () => Promise<void>
) {
  toast.custom(t => (
    <div className="fixed flex w-80 items-center justify-center">
      <div className="mt-1/2 flex w-full flex-col gap-4 rounded-lg bg-zinc-100 p-4">
        <h1 className="font-semibold">Alterar o status do ticket?</h1>
        <div>
          <span className="font-semibold text-xs">
            ID do ticket a ser alterado:
          </span>
          <pre className="font-mono text-xs">{ticketId}</pre>
        </div>
        <div className="flex w-full gap-4">
          <Button variant="outline" onClick={() => toast.dismiss(t)}>
            Cancelar
          </Button>
          <Button
            className="w-full"
            variant="default"
            onClick={() => {
              onConfirm()
              toast.dismiss(t)
            }}
          >
            Continuar
          </Button>
        </div>
      </div>
    </div>
  ))
}
