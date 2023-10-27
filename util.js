/**
 * Calculates the score if is jumping through the ring of fire or has gotten a bonus
 * @param {array} bonuses
 * @param {array} obstacles
 * @param {object} playerPosition
 * @param {number} playerPosition.x
 * @param {number} playerPosition.y
 * @param {number} lastScore
 */
const calculateScore = (bonuses, obstacles, playerPosition, lastScore) => {
  const { x, y } = playerPosition;

  return bonuses.some(bonus => bonus.x === x && y === 10)
    ? lastScore + 10
    : obstacles.some(obstable => obstable.x === x && y !== 10)
    ? lastScore + 100
    : lastScore;
};

/**
 * Remove from the array when x position is less than 0 and move a unit the rest
 * @param {array} array
 * @param {number} distanceToMove
 */
const removeAndMove = (array, distanceToMove) => {
  return array
    .filter(item => item.x > 0)
    .map(item => ({
      ...item,
      x: item.x - distanceToMove
    }));
};

/**
 * Remove from the array when x position is less than 0 and when player is touching it,
 * also moves a unit the rest
 * @param {array} array
 * @param {object} playerPosition
 * @param {number} playerPosition.x
 * @param {number} playerPosition.y
 * @param {number} distanceToMove
 */
const removeInTouchAndMove = (array, playerPosition, distanceToMove) => {
  const { x, y } = playerPosition;
  const touchedIndex = array.findIndex(item => item.x === x && y === 10);

  return removeAndMove(
    touchedIndex >= 0
      ? [...array.slice(0, touchedIndex), ...array.slice(touchedIndex + 1)]
      : array,
    distanceToMove
  );
};

/**
 * Removes all the elements by a given classname
 * @param {string} className
 */
const removeElementsByClass = className => {
  var elements = document.getElementsByClassName(className);
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
};
