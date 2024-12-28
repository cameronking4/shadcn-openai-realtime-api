import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Message } from "@/types"

interface TokenUsageDisplayProps {
  messages: Message[]
}

export function TokenUsageDisplay({ messages }: TokenUsageDisplayProps) {
  return (
    <>
    { messages.length > 0 && (
    <Accordion type="single" collapsible key="token-usage" className="w-full">
      <AccordionItem value="token-usage">
        <AccordionTrigger>
          <CardTitle className="text-sm font-medium">Token Usage</CardTitle>
        </AccordionTrigger>
        <AccordionContent>
          <Card>
            <CardContent>
              <div className="space-y-1 mt-4">
                {messages
                  .filter((msg) => msg.type === 'response.done')
                  .slice(-1)
                  .map((msg) => {
                    const tokenData = [
                      { label: "Total Tokens", value: msg.response?.usage?.total_tokens },
                      { label: "Input Tokens", value: msg.response?.usage?.input_tokens }, 
                      { label: "Output Tokens", value: msg.response?.usage?.output_tokens }
                    ];

                    return (
                      <Table key="token-usage-table">
                        <TableBody>
                          {tokenData.map(({label, value}) => (
                            <TableRow key={label}>
                              <TableCell className="font-medium motion-preset-focus-s">{label}</TableCell>
                              <TableCell>{value}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    );
                  })}
              </div>
            </CardContent>
          </Card>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
    )
  }
  </>
  )
} 