const TButton = {
  baseClass: 'border block rounded-lg font-bold inline-flex items-center justify-center shadow-md focus:outline-none focus:shadow-outline',
  defaultClass: 'bg-white border-gray-400 hover:bg-gray-100 hover:border-gray-500',
  primaryClass: 'text-white border-purple-500 bg-purple-500 hover:bg-purple-600 hover:border-purple-600 shadow-lg',
  secondaryClass: 'border-purple-400 text-white bg-purple-400 hover:border-purple-300 hover:bg-purple-300 hover:text-gray-700',
  tertiaryClass: 'border block underline text-blue-500 border-transparent bg-transparent hover:text-blue-600',
  successClass: 'text-white bg-green-500 border-green-500 hover:bg-green-600 hover:border-green-600',
  dangerClass: 'text-white bg-red-500 border-red-500 hover:bg-red-600 hover:border-red-600',
  warningClass: 'text-yellow-900 bg-yellow-500 border-yellow-500 hover:bg-yellow-600 hover:border-yellow-600',
  disabledClass: 'cursor-not-allowed opacity-50',
  defaultSizeClass: 'px-6 py-3',
  largeSizeClass: 'px-8 py-4 text-lg',
  smallSizeClass: 'px-4 py-2 text-sm',
  inputLeftClass: 'rounded-l-none'
}

const TInput = {
  baseClass: 'block .w-8/12 rounded-lg bg-white m-auto focus:outline-none focus:shadow-outline',
  inlinebuttonClass: 'rounded-r-none',
  defaultStatusClass: 'bg-white',
  warningStatusClass: 'border-yellow-400 bg-yellow-100',
  errorStatusClass: 'border-red-300 bg-red-100',
  successStatusClass: 'border-green-300 bg-green-100',
  disabledClass: 'bg-gray-100 cursor-not-allowed opacity-75',
  defaultSizeClass: 'p-3',
  largeSizeClass: 'p-4 text-lg',
  smallSizeClass: 'p-2 text-sm',
}

const Atium = {
  TButton,
  TInput,
}

export default Atium