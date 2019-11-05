const blogs = [
	{
		title: 'title1',
		author: 'Elisei Sergiu',
		url: 'body.url',
		likes: 158,
		user: {
			username: 'konstanzin',
			name: 'lololo',
			id: '5dbadc034606f6108c207176'
		},
		id: '5dbaebbd6e0058197c1a92a2'
	},
	{
		title: 'title12232323232',
		author: 'Elisei Sergiu',
		url: 'body.ur321312312l',
		likes: 39,
		user: {
			username: 'konstanzin',
			name: 'lololo',
			id: '5dbadc034606f6108c207176'
		},
		id: '5dbaebf96e0058197c1a92a3'
	},
	{
		title: 'test title',
		author: 'Elisei Sergiu',
		url: 'url test',
		likes: 9,
		user: {
			username: 'dadada',
			name: 'lololo',
			id: '5dbae0e3331d0e29d436f6ed'
		},
		id: '5dbaee7791086526300f7692'
	}
]

const getAll = () => {
	return Promise.resolve(blogs)
}

export default { getAll }