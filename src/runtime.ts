export interface Slots {
	default?: () => string
	[key: string]: (() => string) | undefined
}

type AstroInit<T> = ((props: T, slots: Slots) => {
	init: (el: HTMLElement) => void | false
	destroy: () => void
	render: () => string
}) & {
	isAstroInit: true
}

export function createAstroInit<T>(creator: (props: T, slots: Slots) => {
	init: (el: HTMLElement) => void | false
	destroy: () => void
	render: () => string
}) {
	return Object.assign(creator, { isAstroInit: true }) as unknown as AstroInit<T>
}

function defaultRender(_props: any, slots: Slots) {
	return slots.default?.() || ""
}

export function defineAstroInit<T>({
	init,
	render = defaultRender,
	destroy = () => {},
}: {
	init: (el: HTMLElement, props: T, slots: Slots) => void | false
	destroy?: () => void
	render?: (props: T, slots: Slots) => string
}) {
	const AstroInitComponent: AstroInit<T> = createAstroInit((props: T, slots: Slots) => {
		return {
			init: (el: HTMLElement) => init(el, props, slots),
			destroy: () => destroy(),
			render: () => render(props, slots),
		}
	})
	return AstroInitComponent
}
