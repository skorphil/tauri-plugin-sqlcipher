## Default Permission

### Default Permissions

This permission set configures what kind of
database operations are available from the sql plugin.

### Granted Permissions

All reading related operations are enabled.
Also allows to load or close a connection.



- `allow-close`
- `allow-load`
- `allow-select`

## Permission Table

<table>
<tr>
<th>Identifier</th>
<th>Description</th>
</tr>


<tr>
<td>

`sqlcipher:allow-close`

</td>
<td>

Enables the close command without any pre-configured scope.

</td>
</tr>

<tr>
<td>

`sqlcipher:deny-close`

</td>
<td>

Denies the close command without any pre-configured scope.

</td>
</tr>

<tr>
<td>

`sqlcipher:allow-execute`

</td>
<td>

Enables the execute command without any pre-configured scope.

</td>
</tr>

<tr>
<td>

`sqlcipher:deny-execute`

</td>
<td>

Denies the execute command without any pre-configured scope.

</td>
</tr>

<tr>
<td>

`sqlcipher:allow-load`

</td>
<td>

Enables the load command without any pre-configured scope.

</td>
</tr>

<tr>
<td>

`sqlcipher:deny-load`

</td>
<td>

Denies the load command without any pre-configured scope.

</td>
</tr>

<tr>
<td>

`sqlcipher:allow-ping`

</td>
<td>

Enables the ping command without any pre-configured scope.

</td>
</tr>

<tr>
<td>

`sqlcipher:deny-ping`

</td>
<td>

Denies the ping command without any pre-configured scope.

</td>
</tr>

<tr>
<td>

`sqlcipher:allow-select`

</td>
<td>

Enables the select command without any pre-configured scope.

</td>
</tr>

<tr>
<td>

`sqlcipher:deny-select`

</td>
<td>

Denies the select command without any pre-configured scope.

</td>
</tr>
</table>
