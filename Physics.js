// Just checks for collision between two objects
function collides(obj1, obj2) {
    if (obj1.position.x < obj2.position.x + obj2.size.x &&
        obj1.position.x + obj1.size.x > obj2.position.x &&
        obj1.position.y < obj2.position.y + obj2.size.y &&
        obj1.size.y + obj1.position.y > obj2.position.y) {
        return true;
    } else {
        return false;
    }
}

function phys(obj1, obj2, deltaTime) {
    // obj1 is the moving object

    // Save the position before moving it
    var oldPos = obj1.position;

    // The amount to move this frame
    var vel = obj1.velocity.mul(deltaTime);

    // Move the objects
    obj1.position = obj1.position.add(vel);

    var t1, t2;
    // Check for collision this frame
    if (collides(obj1, obj2)) {
        if (oldPos.y >= obj2.position.y + obj2.size.y) {
            // Check for intersection on lower horiz line
            var bottom = obj2.position.y + obj2.size.y; // Bottom of obstacle
            var dir = obj1.velocity.normalize(); // Direction of the movement

            // The distance from oldPos to the collision point
            var t = (bottom - oldPos.y) / dir.y;

            // Collision point
            var hit = oldPos.add(dir.mul(t));

            // Make sure the collision happens on the x axis
            if (hit.x > obj2.position.x - obj1.size.x &&
            hit.x < obj2.position.x + obj2.size.x) {
                if (t >= 0) t1 = t;
            }
        } else if (oldPos.y + obj1.size.y <= obj2.position.y) {
            //if(obj1 == player) console.log("down");
            // Check for intersection on upper horiz line
            var top = obj2.position.y; // top of obstacle
            var dir = obj1.velocity.normalize(); // Direction of the movement

            // The distance from oldPos to the collision point
            var t = (top - (oldPos.y + obj1.size.y)) / dir.y;

            // Collision point
            var hit = oldPos.add(dir.mul(t));

            // Make sure the collision happens on the x axis
            if (hit.x > obj2.position.x - obj1.size.x &&
            hit.x < obj2.position.x + obj2.size.x) {
                if (t >= 0) t1 = t;
            }
        }


        if (oldPos.x >= obj2.position.x + obj2.size.x) {
            // Check for intersection on right vert line
            var right = obj2.position.x + obj2.size.x; // Right side of obstacle
            var dir = obj1.velocity.normalize(); // Direction of the movement

            // The distance from oldPos to the collision point
            var t = (right - oldPos.x) / dir.x;

            // Collision point
            var hit = oldPos.add(dir.mul(t));

            // Make sure the collision happens on the y axis
            if (hit.y > obj2.position.y - obj1.size.y &&
            hit.y < obj2.position.y + obj2.size.y) {
                if (t >= 0) t2 = t;
            }
        } else if (oldPos.x + obj1.size.x <= obj2.position.x) {
            // Check for intersection on left vert line
            var left = obj2.position.x; // left side of obstacle
            var dir = obj1.velocity.normalize(); // Direction of the movement

            // The distance from oldPos to the collision point
            var t = (left - (oldPos.x + obj1.size.x)) / dir.x;

            // Collision point
            var hit = oldPos.add(dir.mul(t));

            // Make sure the collision happens on the y axis
            if (hit.y > obj2.position.y - obj1.size.y &&
            hit.y < obj2.position.y + obj2.size.y) {
                if (t >= 0) t2 = t;
            }
        }
    }

    obj1.position = oldPos;
    if((t1 < t2 || t2 == undefined) && t1 != undefined) {
        return {t: t1, ax: true};
    } else if (t2 != undefined) {
        return {t: t2, ax: false};
    }

    return {t: -1, ax: false};
}
