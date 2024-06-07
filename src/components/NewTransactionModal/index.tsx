import * as Dialog from "@radix-ui/react-dialog";
import * as z from 'zod';

import { Overlay, Content, CloseButton, TransactionType, TransactionTypeButton } from "./styles";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const newTransactionSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),  
})

type NewTransactionInputs = z.infer<typeof newTransactionSchema>

export function NewTransactionModal() {
  const {
    control,
    register,
    handleSubmit,
    formState: {
      isSubmitting
    }
  } = useForm<NewTransactionInputs>({
    resolver: zodResolver(newTransactionSchema),
    defaultValues: {
      type: 'income'
    }
  })

  async function handleCreateNewTransaction(data: NewTransactionInputs) {
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log(data)
  }

  return (
    <Dialog.Portal>
      <Overlay />
      
      <Content>
        <Dialog.Title>Nova transação</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewTransaction)} action="">
          <input
            type="text"
            placeholder="Descrição"
            required
            disabled={isSubmitting}
            {...register('description')}
          />
          <input
            type="number"
            placeholder="Preço"
            required
            disabled={isSubmitting}
            {...register('price', { valueAsNumber: true })}
          />
          <input
            type="text"
            placeholder="Categoria"
            required
            disabled={isSubmitting}
            {...register('category')}
          />

          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              return(
                <TransactionType
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <TransactionTypeButton value="income" variant="income" type="button">
                    <ArrowCircleUp size={24} />
                    Entrada
                  </TransactionTypeButton>

                  <TransactionTypeButton value="outcome" variant="outcome" type="button">
                    <ArrowCircleDown size={24} />
                    Saída
                  </TransactionTypeButton>
                </TransactionType>
              )
            }}
          />

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}