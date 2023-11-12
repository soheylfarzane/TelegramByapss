const URL_PATH_REGEX = /^\/bot(?<bot_token>[^/]+)\/(?<api_method>[a-z]+)/i;
async function handleTelegramRequest(request) {
	const url = new URL(request.url);

	// آدرس URL را به API تلگرام تغییر می‌دهد.
	url.hostname = 'api.telegram.org';

	// یک درخواست جدید با آدرس تغییر یافته ایجاد می‌کند.
	const newRequest = new Request(url.toString(), request);

	// پاسخ از API را دریافت می‌کند.
	const response = await fetch(newRequest);

	return response;
}

function handleRootRequest() {
	const result = 'همه چیز درسته فقط به جای api تلگرام آدرس ورکر رو بزار و تمام.';

	return new Response(JSON.stringify({ ok: true, result }), {
		status: 200,
		statusText: result,
		headers: {
			'content-type': 'application/json',
		},
	});
}


async function handle404Request() {
	const description = 'این مسیر غلطه یه سر به داکیومنت های تلگرام بزن';
	const error_code = 404;

	return new Response(JSON.stringify({ ok: false, error_code, description }), {
		status: error_code,
		statusText: description,
		headers: {
			'content-type': 'application/json',
		},
	});
}

async function handleRequest(request) {
	const { pathname } = new URL(request.url);

	if (URL_PATH_REGEX.test(pathname)) {
		return await handleTelegramRequest(request);
	}

	if (pathname === '/') {
		return handleRootRequest();
	}

	return handle404Request();
}

addEventListener('fetch', (event) => {
	event.respondWith(handleRequest(event.request));
});
