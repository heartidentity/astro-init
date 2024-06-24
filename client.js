export default element =>
	async (Component, props, slotted, { client }) => {
		const component = await Component(props, slotted)

		if (client === "only") {
			const html = component.render()
			element.innerHTML = html
		}

		const initResult = component.init(element)

		if (initResult !== false) {
			element.addEventListener("astro:unmount", () => component.destroy(), { once: true })
		}
	}
