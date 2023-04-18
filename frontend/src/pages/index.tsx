import Header from '@/components/Header'
import WriteForm from '@/components/WriteForm'
import Cards from '@/components/Cards'
import { GlobalProps } from '@/utils/interfaces'

export default function Home(props: GlobalProps) {
  return (
    <>
      <Header />
      <WriteForm loading={props.loading} modal={props.modal} />
      <Cards loading={props.loading} modal={props.modal} />
    </>
  )
}
