/**
 * Provided global DOM accessor aliases.
 */

/**
 * Returns the element that has the ID attribute with the specified value.
 * @param {string} idName - element ID
 * @returns {object} DOM object associated with id (null if none).
 */
function id(idName) {
  return document.getElementById(idName);
}

/**
 * Returns the first element that matches the given CSS selector.
 * @param {string} selector - CSS query selector string.
 * @returns {object} first element matching the selector in the DOM tree (null if none)
 */
function qs(selector) {
  return document.querySelector(selector);
}

/**
 * Returns the array of elements that match the given CSS selector.
 * @param {string} selector - CSS query selector
 * @returns {object[]} array of DOM objects matching the query (empty if none).
 */
function qsa(selector) {
  return document.querySelectorAll(selector);
}

/**
 * Returns a new element with the given tagname
 * @param {string} tagName - name of element to create and return
 * @returns {object} new DOM element with the given tagname
 */
function gen(tagName) {
  return document.createElement(tagName);
}

/**
 * Helper function to return the Response data if successful, otherwise
 * returns an Error that needs to be caught.
 * @param {object} response - response with status to check for success/error.
 * @returns {object} - The Response object if successful, otherwise an Error that
 * needs to be caught.
 */
function checkStatus(response) {
  if (!response.ok) { // response.status >= 200 && response.status < 300
    throw Error(`Error in request: ${response.statusText}`);
  } // else, we got a response back with a good status code (e.g. 200)
  return response; // A resolved Response object.
}

/**
 * For the Spotify project, there should be another score function
 * which formats the argument properly and normalizes the result.
 *
 * Algorithm to compute the Kendall distance between a permutation
 * and (1 2 3 ... n) in nlogn time. Shoutout CS38.
 *
 * @param {array} p - a list of integers representing the permutation
 */
function kendall(p) {
  // Aux algo
  // Count the number of pairs i,j such that
  // a[i] > b[j]
  let countPairs = (a, b) => {
    let c = 0;
    let j = 0;
    for (let i = 0; i < a.length; i++) {
      while (j < b.length && a[i] > b[j]) {
        j++;
      }
      c += j;
    }
    return c;
  };

  let kendall_helper = (p) => {
    if (p.length < 2) return 0;

    let half = Math.ceil(p.length / 2);
    let left = p.slice(0, half);
    let right = p.slice(half, p.length);

    let leftResult = kendall_helper(left);
    let rightResult = kendall_helper(right);
    let result = leftResult + rightResult + countPairs(left, right);

    for (let i = 0; i < p.length; i++) {
      if (i < half) p[i] = left[i];
      else p[i] = right[i - half];
    }

    return result;
  };

  return (kendall_helper(p) / (p.length * (p.length - 1))) * 2;
}
