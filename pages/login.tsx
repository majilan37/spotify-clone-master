import { GetServerSideProps } from 'next'
import { getProviders, signIn } from 'next-auth/react'
import { Provider } from '../types/globals'

function Login({ providers }: { providers: { spotify: Provider } }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black ">
      <img className="mb-5 w-52" src="https://bit.ly/3rfk3Oq" alt="" />
      {Object.values(providers).map((provider: Provider) => (
        <div key={provider.id} className="">
          <button
            onClick={() => signIn(provider.id, { callbackUrl: '/' })}
            className="rounded-lg bg-[#18D860] p-5 text-white"
          >
            Log in with {provider.name}{' '}
          </button>
        </div>
      ))}
    </div>
  )
}

export default Login

export const getServerSideProps: GetServerSideProps = async ({}) => {
  const providers = await getProviders()
  return {
    props: {
      providers,
    },
  }
}
