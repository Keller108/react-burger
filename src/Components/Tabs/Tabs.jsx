import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

export function Tabs({
    types,
    currentTab,
    setCurrentTab
}) {
    return (
        <div className="pb-10" style={{ display: 'flex' }}>
            {types.map((type) => <Tab
                key={type}
                value={type}
                active={currentTab === type}
                onClick={() => setCurrentTab(type)}
            >
                {type === 'bun'
                    ? "Булки" : type === 'main'
                        ? 'Начинка' : type === "sauce"
                            ? "Соусы" : null
                }
            </Tab>)}
        </div>
    )
}