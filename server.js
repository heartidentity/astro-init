function check(Component) {
	return !!Component.isAstroInit
}

async function renderToStaticMarkup(Component, inputProps, slotted, _metadata) {
	const props = { ...inputProps }
	const slots = {}

	for (const [key, value] of Object.entries(slotted)) {
		slots[key] = () => {
			delete slotted[key] // this is ugly, but we don't want rendered slots to pass to the client
			return value
		}
	}

	let html = ""

	try {
		const component = await Component(props, slots)
		html = component.render()
	}
	catch (error) {
		console.error("Error rendering astro-init component", error)
		html = slots.default()
	}

	return { html }
}

export default {
	check,
	renderToStaticMarkup,
	supportsAstroStaticSlot: false,
}
