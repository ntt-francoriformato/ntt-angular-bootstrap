type ComponentStyle = () => string[];

/* This is an example of how we are going to override primeng style behaviour */
const buttons: ComponentStyle = () => [`flex-shrink: 0;`];

const datatable: ComponentStyle = () => [
  `tr:hover {
    background-color: var(--color-surface-variant) !important;
  }`,
];

// NOTE: always use the same name PrimeNG uses, since this object will be directly used in primeng theme
export const components = {
  buttons: { css: () => `.p-button {${buttons().join('')}}` },
  datatable: { css: () => `.p-datatable {${datatable().join('')}}` },
};
