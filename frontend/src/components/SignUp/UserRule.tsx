import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const UserRule = () => {
  // type ValueType = {
  //   value: string
  //   label: string
  // }

  // const options: ValueType[] = [
  //   { value: '학생', label: '학생' },
  //   { value: '학부모', label: '학부모' },
  //   { value: '선생님', label: '선생님' },
  // ]

  // const [inputRule, setInputRule] = useState<string>(options[0].value)

  // const handleRuleChange = (selectedOption: SingleValue<string>) => {
  //   if (selectedOption) {
  //     setInputRule(selectedOption)
  //   }
  // }

  const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <Select<ColourOption | FlavourOption, false, GroupedOption>
      defaultValue={colourOptions[1]}
      options={groupedOptions}
      formatGroupLabel={formatGroupLabel}
      styles={{ zIndex: 2 }}
    />
  )
}

export default UserRule
