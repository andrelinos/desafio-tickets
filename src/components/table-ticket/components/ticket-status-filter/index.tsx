import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Props {
  onSelect: (value: string) => void
  selectedFilter: string
}

export function TicketStatusFilter({ onSelect, selectedFilter }: Props) {
  const handleChange = (selectedValue: string) => {
    onSelect(selectedValue)
  }

  return (
    <div className="flex items-center gap-2 px-4">
      <Label htmlFor="status" className="whitespace-nowrap">
        Filtrar por{' '}
      </Label>

      <Select name="status" onValueChange={handleChange} value={selectedFilter}>
        <SelectTrigger className="w-44">
          <SelectValue placeholder="Selecione um status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Estados</SelectLabel>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="open">Aberto</SelectItem>
            <SelectItem value="closed">Fechado</SelectItem>
            <SelectItem value="in-progress">Em andamento</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
