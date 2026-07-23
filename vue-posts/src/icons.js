import {h} from 'vue';

const svgProps = (props = {}) => ({
  xmlns: 'http://www.w3.org/2000/svg',
  width: props.size ?? 22,
  height: props.size ?? 22,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  'stroke-width': props.strokeWidth ?? 2,
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round',
  'aria-hidden': 'true',
});

const icon = children => (props, {attrs}) =>
  h('svg', {...svgProps(props), ...attrs}, children);

export const House = icon([
  h('path', {
    d: 'M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8',
  }),
  h('path', {
    d: 'M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
  }),
]);

export const Search = icon([
  h('circle', {cx: '11', cy: '11', r: '8'}),
  h('path', {d: 'm21 21-4.3-4.3'}),
]);

export const Ticket = icon([
  h('path', {
    d: 'M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z',
  }),
  h('path', {d: 'M13 5v2'}),
  h('path', {d: 'M13 17v2'}),
  h('path', {d: 'M13 11v2'}),
]);

export const Plane = icon([
  h('path', {
    d: 'M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z',
  }),
]);

export const X = icon([
  h('path', {d: 'M18 6 6 18'}),
  h('path', {d: 'm6 6 12 12'}),
]);
