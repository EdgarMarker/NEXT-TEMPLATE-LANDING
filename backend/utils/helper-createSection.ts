export const createSection = (
	groupData: { name: string; title: string },
	fields: any[] = [],
) => ({
	name: groupData.name,
	title: `Sección ${groupData.title}`,
	type: "object",
	group: groupData.name,
	fields,
});
