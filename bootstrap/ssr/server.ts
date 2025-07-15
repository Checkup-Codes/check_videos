import createServer from '@inertiajs/server';
import render from '../../resources/js/ssr';

createServer((page) => render(page));
