#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

mat2 scale(vec2 scale) { return mat2(scale.x, 0.0, 0.0, scale.y); }

float rectshape(vec2 position, vec2 scale) {
  scale = vec2(0.5) - scale * 0.5;
  vec2 shaper = vec2(step(scale.x, position.x), step(scale.y, position.y));
  shaper *=
      vec2(step(scale.x, 1.0 - position.x), step(scale.y, 1.0 - position.y));
  return shaper.x * shaper.y;
}

mat2 rotate(float angle) {
  return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
}

float circleshape(vec2 position, float radius) {
  return step(radius, length(position - vec2(0.5)));
}

void main() {
  vec2 coord = gl_FragCoord.xy / u_resolution;
  vec3 color = vec3(0.0);
  vec2 rectCoord = coord;
  vec2 rect2Coord = coord;
  vec2 circleCoord = coord;
  vec2 squareSideLen = vec2(0.2);

  // rectangle movement
  rectCoord -= vec2(0.5);
  rectCoord = scale(vec2(sin(u_time) + 2.0)) * rectCoord;
  //   rectCoord += vec2(0.5);

  //   vec2 translate = vec2(sin(u_time), cos(u_time));
  //   rectCoord += translate * 0.25;

  rectCoord = rotate(u_time) * rectCoord;

  //   rect2Coord += translate * 0.25;
  //   rect2Coord -= vec2(0.5);
  //   rect2Coord = rotate(u_time) * rect2Coord;

  //   rect2Coord += vec2(0.5);

  // circle movement
  //   circleCoord -= vec2(0.5);
  //   circleCoord = scale(vec2(sin(u_time) + 2.0)) * circleCoord;
  //   circleCoord += vec2(0.5);

  color += vec3(rectshape(rectCoord, squareSideLen));
  //   color -= vec3(rectshape(rectCoord, vec2(squareSideLen)));

  //   color += vec3(circleshape(circleCoord, 0.1));

  gl_FragColor = vec4(color, 1.0);
}