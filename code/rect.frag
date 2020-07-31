#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

float circle_shape(vec2 position, float radius) {
  return step(radius, length(position - vec2(0.5)));
}

float rect_shape(vec2 position, vec2 scale) {
  scale = vec2(0.5) - scale * 0.5;
  vec2 shaper = vec2(step(scale.x, position.x), step(scale.y, position.y));
  shaper *=
      vec2(step(scale.x, 1.0 - position.x), step(scale.y, 1.0 - position.y));
  return shaper.x * shaper.y;
}

void main() {
  vec2 position = gl_FragCoord.xy / u_resolution;

  vec3 color = vec3(0.0);

  float rectangle = rect_shape(position, vec2(0.7, 0.6));

  color = vec3(rectangle);

  gl_FragColor = vec4(color, 1.0);
}