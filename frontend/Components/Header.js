import { Link } from 'react-router-dom'
const Header = ({isSignedIn, wallet, signInFun, signOutFun}) => {

  return (
    <div className=" flex justify-between items-center p-5 shadow-md shadow-gray-300 ">
      <Link to="/" className="font-bold text-2xl">
       I<span className="text-green-500">Decide</span>
      </Link>

      {isSignedIn ? (
        <button
          type="button"
          className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium
          text-xs leading-tight rounded shadow-md hover:bg-blue-700
          hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none
          focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          onClick={signOutFun}
        >
          {wallet.accountId}
        </button>
      ) : (
        <button
          type="button"
          className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium
          text-xs leading-tight rounded shadow-md hover:bg-blue-700
          hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none
          focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          onClick={signInFun}
        >
          Login
        </button>
      )}
    </div>
  )
}

export default Header
